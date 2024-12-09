package edu.poly.hightstar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.poly.hightstar.domain.Notification;
import edu.poly.hightstar.enums.RecipientType;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Lấy thông báo theo loại người nhận
    List<Notification> findByRecipientType(RecipientType recipientType);
}
