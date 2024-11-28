package edu.poly.hightstar.service;

import java.util.List;

import edu.poly.hightstar.model.AttendanceDTO;

public interface AttendanceService {
    List<AttendanceDTO> getAllAttendances();

    AttendanceDTO getAttendanceById(Long id);

    AttendanceDTO createAttendance(AttendanceDTO attendanceDTO);

    AttendanceDTO updateAttendance(Long id, AttendanceDTO attendanceDTO);

    void deleteAttendance(Long id);
}