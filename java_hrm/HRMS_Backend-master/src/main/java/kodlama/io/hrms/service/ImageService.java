package kodlama.io.hrms.service;

import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.Image;

import java.io.IOException;

public interface ImageService {

    Result uploadPhoto(Image image) throws IOException;

}
