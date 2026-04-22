package com.example.demo.Entities;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name ="reviews")
@Getter@Setter@NoArgsConstructor@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;
    @ManyToOne
    @JoinColumn(name ="book_id")
    private Book book;
}
