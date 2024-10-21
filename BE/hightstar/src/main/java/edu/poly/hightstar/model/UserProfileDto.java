package edu.poly.hightstar.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    @JsonProperty("id")
    private Long profileId;
    private String fullName;
    private String avatar;
    private String phoneNumber;
    private Date dateOfBirth;
    private boolean gender;
    private String bio;
    private LocalDateTime updatedAt;
    private Long userId;
}