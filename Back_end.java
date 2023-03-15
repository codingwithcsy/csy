import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class User {
    private String id;
    private String username;
    private String password;
    private List<String> pastPurchases;
    private List<String> preferences;

    public User(String username, String password) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.password = password;
        this.pastPurchases = new ArrayList<>();
        this.preferences = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public List<String> getPastPurchases() {
        return pastPurchases;
    }

    public void addPastPurchase(String pastPurchase) {
        pastPurchases.add(pastPurchase);
    }

    public List<String> getPreferences() {
        return preferences;
    }

    public void addPreference(String preference) {
        preferences.add(preference);
    }
}

import java.util.ArrayList;
import java.util.List;

public class Recommendation {
    private String id;
    private String name;
    private String description;
    private String sentiment;

    public Recommendation(String name, String description, String sentiment) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.description = description;
        this.sentiment = sentiment;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getSentiment() {
        return sentiment;
    }
}

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RecommendationService {
    private Map<String, User> users;
    private List<Recommendation> recommendations;

    public RecommendationService() {
        this.users = new HashMap<>();
        this.recommendations = new ArrayList<>();
    }

    public void addUser(String username, String password) {
        users.put(username, new User(username, password));
    }

    public User getUser(String username) {
        return users.get(username);
    }

    public List<Recommendation> getRecommendations(String search) {
        List<Recommendation> filteredRecommendations = new ArrayList<>();

        for (Recommendation recommendation : recommendations) {
            if (recommendation.getName().toLowerCase().contains(search.toLowerCase())) {
                filteredRecommendations.add(recommendation);
            }
        }

        return filteredRecommendations;
    }

    public void addRecommendation(String name, String description, String sentiment) {
        recommendations.add(new Recommendation(name, description, sentiment));
    }

    // Machine learning algorithm goes here

    // User authentication and data privacy methods go here
}
