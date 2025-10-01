package com.nikk.slstats.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sl_players")
public class Player {
    @Id
    @Column(name="player_name", unique=true, nullable=false)
    private String playerName;
    private String nation;
    private String position;
    private Integer age;
    private Double minutesPlayed;
    private Double goals;
    private Double assists;
    private Double penaltyGoals;
    private Double yellowCards;
    private Double redCards;
    private String team;

    public Player() {
    }

    public Player(String playerName, String nation, String position, Integer age, Double minutesPlayed, Double goals, Double assists, Double penaltyGoals, Double yellowCards, Double redCards, String team) {
        this.playerName = playerName;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.minutesPlayed = minutesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.penaltyGoals = penaltyGoals;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.team = team;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Double minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public Double getGoals() {
        return goals;
    }

    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Double getAssists() {
        return assists;
    }

    public void setAssists(Double assists) {
        this.assists = assists;
    }

    public Double getPenaltyGoals() {
        return penaltyGoals;
    }

    public void setPenaltyGoals(Double penaltyGoals) {
        this.penaltyGoals = penaltyGoals;
    }

    public Double getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(Double yellowCards) {
        this.yellowCards = yellowCards;
    }

    public Double getRedCards() {
        return redCards;
    }

    public void setRedCards(Double redCards) {
        this.redCards = redCards;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
}
