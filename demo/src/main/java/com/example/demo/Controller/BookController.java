package com.example.demo.Controller;
import com.example.demo.Entities.Book;
import com.example.demo.Entities.Author;
import com.example.demo.Repository.BookRepository;
import com.example.demo.Repository.AuthorRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping
    public Book createBook(@RequestBody Book book){
        if (book.getAuthor() != null && book.getAuthor().getId() != null) {
            Author author = authorRepository.findById(book.getAuthor().getId())
                    .orElseThrow(() -> new RuntimeException("Author Not Found"));
            book.setAuthor(author);
        }
        return bookRepository.save(book);
    }
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
        Book book = bookRepository.findById(id).orElseThrow(()-> new RuntimeException("Book Not Found"));
        book.setTitle(bookDetails.getTitle());
        if (bookDetails.getAuthor() != null && bookDetails.getAuthor().getId() != null) {
            Author author = authorRepository.findById(bookDetails.getAuthor().getId())
                    .orElseThrow(() -> new RuntimeException("Author Not Found"));
            book.setAuthor(author);
        } else {
            book.setAuthor(null);
        }
        return bookRepository.save(book);
    }
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id){
        bookRepository.deleteById(id);
    }
}
