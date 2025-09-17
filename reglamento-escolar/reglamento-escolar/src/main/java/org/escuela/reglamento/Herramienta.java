package org.escuela.reglamento;

import io.quarkiverse.mcp.server.Tool;
import io.quarkiverse.mcp.server.ToolArg;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.pdfbox.Loader;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.IOException;
import java.nio.file.*;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static org.apache.pdfbox.pdmodel.PDDocument.*;

@ApplicationScoped
public class Herramienta {

    @ConfigProperty(name = "mcp.pdf.dir", defaultValue = "./pdfs")
    String pdfDir;

    private static final Pattern SENTENCE_SPLIT =
            Pattern.compile("(?<=[.!?¡¿])\\s+|\\n+");

    // Cache simple
    private volatile Cached cached = null;

    @Tool(description = "Responde en TEXTO PLANO según lo que dice el PDF encontrado en el directorio configurado, devolviendo todas las oraciones relevantes.")
    public String responder(
            @ToolArg(description = "Pregunta del usuario") String pregunta
    ) {
        try {
            Path pdf = pickPdf();
            if (pdf == null) {
                return "No se encontró ningún PDF en el directorio: " + pdfDir;
            }
            long lm = Files.getLastModifiedTime(pdf).toMillis();
            if (cached == null || !cached.path.equals(pdf) || cached.lastModified != lm) {
                String text = extract(pdf);
                List<String> sentences = splitSentences(text);
                cached = new Cached(pdf, lm, sentences);
            }

            List<String> qTokens = tokens(normalize(pregunta));
            List<ScoredSentence> ranked = rankSentences(cached.sentences, qTokens);

            // Se elimina la limitación de 'maxOraciones'
            List<String> best = ranked.stream()
                    .map(s -> s.sentence.trim())
                    .collect(Collectors.toList());

            if (best.isEmpty()) {
                return "No encontré suficiente información en el PDF para responder.";
            }
            return stitch(best);

        } catch (IOException e) {
            return "Error al leer el PDF: " + e.getMessage();
        } catch (Exception e) {
            return "Error inesperado: " + e.getMessage();
        }
    }

    // ----------- helpers --------------

    private Path pickPdf() throws IOException {
        Path dir = Paths.get(pdfDir);
        if (!Files.exists(dir)) return null;
        try (DirectoryStream<Path> ds = Files.newDirectoryStream(dir, "*.pdf")) {
            List<Path> files = new ArrayList<>();
            for (Path p : ds) files.add(p);
            if (files.isEmpty()) return null;
            files.sort((a,b) -> {
                try {
                    return Long.compare(
                            Files.getLastModifiedTime(b).toMillis(),
                            Files.getLastModifiedTime(a).toMillis());
                } catch (IOException ex) {
                    return 0;
                }
            });
            return files.getFirst(); // más reciente
        }
    }

    private String extract(Path pdf) throws Exception {
        try (PDDocument doc = Loader.loadPDF(pdf.toFile())) {
            PDFTextStripper st = new PDFTextStripper();
            st.setSortByPosition(true);
            return st.getText(doc);
        }
    }

    private static List<String> splitSentences(String text) {
        String cleaned = text.replace("\r", " ").replace("\t", " ");
        String[] raw = SENTENCE_SPLIT.split(cleaned);
        List<String> out = new ArrayList<>();
        for (String s : raw) {
            String t = s.trim();
            if (t.length() >= 25) out.add(t);
        }
        return out;
    }

    private static String normalize(String s) {
        String n = Normalizer.normalize(s, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return n.toLowerCase(Locale.ROOT);
    }

    private static List<String> tokens(String s) {
        String[] t = s.replaceAll("[^\\p{L}\\p{Nd}\\s]", " ")
                .replaceAll("\\s+", " ").trim().split(" ");
        return Arrays.stream(t).filter(w -> w.length() > 2).toList();
    }

    private static List<ScoredSentence> rankSentences(List<String> sentences, List<String> qTokens) {
        Map<String, Integer> df = new HashMap<>();
        for (String s : sentences) {
            Set<String> seen = new HashSet<>(tokens(normalize(s)));
            for (String w : seen) df.merge(w, 1, Integer::sum);
        }
        int N = sentences.size();
        Map<String, Double> idf = new HashMap<>();
        for (Map.Entry<String, Integer> e : df.entrySet()) {
            double val = Math.log(1 + (double) N / (1 + e.getValue()));
            idf.put(e.getKey(), val);
        }

        List<ScoredSentence> scored = new ArrayList<>();
        for (String s : sentences) {
            List<String> toks = tokens(normalize(s));
            if (toks.isEmpty()) continue;

            double score = 0.0;
            for (String q : qTokens) {
                if (toks.contains(q)) {
                    double w = idf.getOrDefault(q, 0.5);
                    score += w;
                }
            }
            if (score > 0) scored.add(new ScoredSentence(s, score));
        }
        scored.sort((a, b) -> Double.compare(b.score, a.score));
        return scored;
    }

    private static String stitch(List<String> sentences) {
        String joined = String.join(" ", sentences).replaceAll("\\s+", " ").trim();
        if (!joined.endsWith(".") && !joined.endsWith("!") && !joined.endsWith("?")) {
            joined = joined + ".";
        }
        return joined;
    }

    private record ScoredSentence(String sentence, double score) {}
    private static class Cached {
        final Path path; final long lastModified; final List<String> sentences;
        Cached(Path p, long lm, List<String> s) { this.path = p; this.lastModified = lm; this.sentences = s; }
    }
}