package com.greentrack.service;

import com.greentrack.exception.ResourceNotFoundException;
import com.greentrack.dto.TreeRequest;
import com.greentrack.entity.Tree;
import com.greentrack.repository.TreeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreeService {

    private final TreeRepository treeRepository;

    public TreeService(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }

    public Tree createTree(TreeRequest request) {

        Tree tree = new Tree();

        tree.setSpecies(request.getSpecies());
        tree.setLocation(request.getLocation());
        tree.setDatePlanted(request.getDatePlanted());

        return treeRepository.save(tree);
    }

    public List<Tree> getAllTrees() {
        return treeRepository.findAll();
    }

    public Tree getTreeById(Long id) {
        return treeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tree not found"));
    }

    public Tree updateTree(Long id, TreeRequest request) {

        Tree tree = treeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tree not found"));

        tree.setSpecies(request.getSpecies());
        tree.setLocation(request.getLocation());
        tree.setDatePlanted(request.getDatePlanted());

        return treeRepository.save(tree);
    }

    public void deleteTree(Long id) {

        Tree tree = treeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tree not found"));

        treeRepository.delete(tree);
    }
}
