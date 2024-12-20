package edu.poly.hightstar.service;

import java.util.List;

import edu.poly.hightstar.model.LoginDTO;
import edu.poly.hightstar.model.LoginResponse;
import edu.poly.hightstar.model.RegisterDTO;
import edu.poly.hightstar.model.UserDTO;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO createUser(UserDTO userDto);

    UserDTO updateUser(Long id, UserDTO userDto);

    void deleteUser(Long id);

    boolean isPhoneNumberExists(String phoneNumber);

    boolean isEmailExists(String email);

    boolean isEmailExistsForUpdate(String email, Long userId);

    UserDTO getUserByUsername(String username);

    UserDTO registerUser(RegisterDTO registerDTO);

    LoginResponse loginUser(LoginDTO loginDTO, HttpServletResponse response);

    boolean resetPassword(String phoneNumber, String newPassword);

    boolean changePassword(Long userId, String password, String newPassword);

    boolean verifyPassword(Long userId, String password);
}
