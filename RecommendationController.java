import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecommendationController {

  @Autowired
  private RecommendationService recommendationService;

  // Handle user creation
  @PostMapping("/api/users")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User savedUser = recommendationService.saveUser(user);
    return ResponseEntity.ok(savedUser);
  }

  // Handle search for products
