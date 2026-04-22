package com.example.demo.Entities;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


import java.util.List;

@Entity
@Table(name ="authors")
@Getter@Setter@NoArgsConstructor@AllArgsConstructor

public class Author {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@Column(nullable = false)
    private String name;
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Book> books;
}
