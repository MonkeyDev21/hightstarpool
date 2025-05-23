package edu.poly.hightstar.service;

import java.util.List;

import edu.poly.hightstar.model.AttendanceDTO;
import edu.poly.hightstar.model.SessionAttendanceDTO;

public interface AttendanceService {
    List<AttendanceDTO> getAllAttendances();

    List<AttendanceDTO> getAttendancesWithoutCheckOut();

    AttendanceDTO scanQRCode(String qrCodeBase64);

    boolean hasCheckedOutWithTicket(Long ticketId);

    AttendanceDTO getAttendanceById(Long id);

    AttendanceDTO createAttendance(AttendanceDTO attendanceDTO);

    AttendanceDTO updateAttendance(Long id, AttendanceDTO attendanceDTO);

    void deleteAttendance(Long id);

    List<SessionAttendanceDTO> getSessionAttendanceForStudent(Long classId, Long studentId);
}
