package com.example.demo.Controller;
import com.example.demo.Entities.Review;
import com.example.demo.Entities.Book;
import com.example.demo.Repository.ReviewRepository;
import com.example.demo.Repository.BookRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    @PostMapping
    public Review createReview(@RequestBody Review review){
        if (review.getBook() != null && review.getBook().getId() != null) {
            Book book = bookRepository.findById(review.getBook().getId())
                    .orElseThrow(() -> new RuntimeException("Book Not Found"));
            review.setBook(book);
        }
        return reviewRepository.save(review);
    }
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review reviewDetails){
        Review review = reviewRepository.findById(id).orElseThrow(()-> new RuntimeException("Review Not Found"));
        review.setContent(reviewDetails.getContent());
        if (reviewDetails.getBook() != null && reviewDetails.getBook().getId() != null) {
            Book book = bookRepository.findById(reviewDetails.getBook().getId())
                    .orElseThrow(() -> new RuntimeException("Book Not Found"));
            review.setBook(book);
        } else {
            review.setBook(null);
        }
        return reviewRepository.save(review);
    }
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id){
        reviewRepository.deleteById(id);
    }
}
