package kodlama.io.hrms.entities.abstracts;

import kodlama.io.hrms.entities.concretes.Profile;
import kodlama.io.hrms.entities.concretes.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

@Data
@Table(name = "users")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "status")
    private boolean status;

    @Column(name = "isactivated")
    private boolean isActivated;

    // Thêm trường profile với mối quan hệ OneToOne và sử dụng mappedBy để liên kết với trường user trong entity Profile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Collection<Role> roles;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", createdDate=" + createdDate +
                ", status=" + status +
                ", isActivated=" + isActivated +
                ", roles=" + roles +
                '}';
    }
}

