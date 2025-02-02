import './ImageGenerator.css'
import default_image from '../ImageGeneratorAssets/suave_logo.png'

const ImageGenerator = () => {
  return (
    <div className="image-generator">
      <div className="image-generator-header">
        AI Image generator
        <div className="img-loading">
            <div className="image">
                <img src={default_image} alt="default-img"></img>
            </div>
        </div>
      </div>

      <div>
        <div className="seach-box">
            <input type="text" className="ad-image-text"  placeholder="Describe your desired image">
                <div className="ad-generate-btn">

                </div>
            </input>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;