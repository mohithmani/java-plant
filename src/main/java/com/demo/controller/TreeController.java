package com.greentrack.controller;

import com.greentrack.dto.TreeRequest;
import com.greentrack.entity.Tree;
import com.greentrack.service.TreeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trees")
public class TreeController {

    private final TreeService treeService;

    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @PostMapping
    public Tree createTree(@RequestBody TreeRequest request) {
        return treeService.createTree(request);
    }

    @GetMapping
    public List<Tree> getAllTrees() {
        return treeService.getAllTrees();
    }

    @GetMapping("/{id}")
    public Tree getTreeById(@PathVariable Long id) {
        return treeService.getTreeById(id);
    }

    @PutMapping("/{id}")
    public Tree updateTree(
            @PathVariable Long id,
            @RequestBody TreeRequest request) {

        return treeService.updateTree(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTree(@PathVariable Long id) {
        treeService.deleteTree(id);
    }
}