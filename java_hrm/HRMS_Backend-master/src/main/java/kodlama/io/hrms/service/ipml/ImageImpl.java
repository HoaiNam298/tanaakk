package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.ImageDao;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.Image;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ImageImpl implements kodlama.io.hrms.service.ImageService {

    private kodlama.io.hrms.core.utilities.adapters.adapters.abstracts.ImageService imageService;
    private ImageDao imageDao;

    @Autowired
    public ImageImpl(kodlama.io.hrms.core.utilities.adapters.adapters.abstracts.ImageService imageService,ImageDao imageDao) {
        this.imageService = imageService;
        this.imageDao = imageDao;
    }

    @Override
    public Result uploadPhoto(Image image) throws IOException {
        imageDao.save(image);
        imageService.upload(image);
        return new SuccessResult(Messages.ImageUploaded);
    }
}
