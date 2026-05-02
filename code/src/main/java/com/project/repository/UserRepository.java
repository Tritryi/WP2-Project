package com.project.repository;

import com.project.entities.FriendListProjection;
import com.project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username);

    @Query("SELECT f FROM User u JOIN u.friends f WHERE u.id = :userId")
    List<FriendListProjection> findFriendListByUserId(Long userId);

    @Query("SELECT COUNT(u) > 0 FROM User u JOIN u.friends f WHERE u.id = :userId AND f.id = :supposedFriendId")
    boolean isFollowing(@Param("userId")Long userId, @Param("supposedFriendId")Long supposedFriendId);
}
