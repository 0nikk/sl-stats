package com.nikk.slstats.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }
    public List<Player> getPlayerByName(String name){
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayerName() != null && player.getPlayerName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersFromTeam(String team){
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam() != null && player.getTeam().toLowerCase().contains(team.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByPos(String position){
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition() != null && player.getPosition().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer){
        Optional<Player> existingPlayer = playerRepository.findByPlayerName(updatedPlayer.getPlayerName());

        if(existingPlayer.isPresent()){
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setPlayerName(updatedPlayer.getPlayerName());
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setAge(updatedPlayer.getAge());
            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(Player player){
        playerRepository.deleteByPlayerName(player.getPlayerName());
    }
}
