package com.example.demo.Controller;

import com.example.demo.Entities.Author;
import com.example.demo.Repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/authors")
@CrossOrigin("*")
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;
    @GetMapping
    public Page<Author> getAllAuthors (
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "5")int size)
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return authorRepository.findAll(pageable);
    }
    @PostMapping
    public Author createAuthor (@RequestBody Author author){
        return authorRepository.save(author);

    }
    @PutMapping("/{id}")
    public Author updateAuthor (@PathVariable Long id, @RequestBody Author authorDetails){
        Author author = authorRepository.findById(id).orElseThrow(()-> new RuntimeException("Author Not Found"));
        author.setName(authorDetails.getName());
        return authorRepository.save(author);
    }
    @DeleteMapping("/{id}")
    public void deleteAuthor (@PathVariable Long id){
        authorRepository.deleteById(id);
    }
}
