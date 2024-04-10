package kodlama.io.hrms.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import javax.persistence.*;
import java.util.Collection;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
}
