package com.nikk.slstats.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(@RequestParam(required = false) String team, @RequestParam(required = false) String name,
                                   @RequestParam(required = false) String position,@RequestParam(required = false) String nation) {
        if(name != null ) {
            return playerService.getPlayerByName(name);
        }
        else  if(team != null ) {
            return playerService.getPlayersFromTeam(team);
        }
        else if(position != null ) {
            return playerService.getPlayersByPos(position);
        }
        else{
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playerService.addPlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
    }

    @PutMapping
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        Player updatedPlayer = playerService.updatePlayer(player);
        if(updatedPlayer != null) {
            return ResponseEntity.ok(updatedPlayer);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping({"/playerName"})
    public ResponseEntity<Player> deletePlayer(@RequestBody Player playerName) {
        playerService.deletePlayer(playerName);
        return ResponseEntity.ok(playerName);
    }
}
