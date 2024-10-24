package edu.poly.hightstar.controller.admin;


import edu.poly.hightstar.model.TrainerDTO;
import edu.poly.hightstar.service.TrainerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping

    public List<TrainerDTO> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerDTO> getTrainerById(@PathVariable Long id) {
        TrainerDTO trainerDto = trainerService.getTrainerById(id);

        if (trainerDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trainerDto);
    }

    @PostMapping
    public ResponseEntity<TrainerDTO> createTrainer(@RequestBody TrainerDTO trainerDto) {
        TrainerDTO createdTrainer = trainerService.createTrainer(trainerDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrainer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainerDTO> updateTrainer(@PathVariable Long id, @RequestBody TrainerDTO trainerDto) {
        TrainerDTO updatedTrainer = trainerService.updateTrainer(id, trainerDto);
        return ResponseEntity.ok(updatedTrainer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
        return ResponseEntity.ok("Trainer deleted successfully.");
    }
}
