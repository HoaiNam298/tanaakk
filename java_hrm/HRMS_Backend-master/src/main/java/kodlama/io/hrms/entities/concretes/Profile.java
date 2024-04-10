package kodlama.io.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kodlama.io.hrms.entities.abstracts.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Data
@Table(name = "profile")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    private String fullName;
    @Column(name = "path_image",columnDefinition = "varchar(10000000)", length = 10000000)
    private String pathImage;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Email
    private String email;
    private String phone;
    private String address;

    @Column(name = "desc_profile")
    private String description;

    // Thêm trường user với mối quan hệ OneToOne và sử dụng JoinColumn để liên kết với trường profile trong entity User
    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    public Profile(String fullName, String pathImage, LocalDate dateOfBirth, String email, String phone, String address, String description) {
        this.fullName = fullName;
        this.pathImage = pathImage;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.description = description;
    }


    public Profile(User user) {
        this.user = user;
    }
}

