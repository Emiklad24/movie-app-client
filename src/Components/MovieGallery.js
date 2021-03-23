import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageGallery from "react-image-gallery";
import swal from "sweetalert";
import "react-image-gallery/styles/css/image-gallery.css";

class MovieGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }
  componentDidMount = () => {
    this.getImages();
  };

  getImages = () => {
    let images = [];
    let image;
    if (this.props.posters) {
      this.props.posters.map((poster) => {
        image = {
          original: `https://image.tmdb.org/t/p/original${poster.file_path}`,
          thumbnail: `https://image.tmdb.org/t/p/original${poster.file_path}`,
        };
        return images.push(image);
      });
      this.setState({ images });
    }
  };

  render() {
    const { posters } = this.props;
    return (
      <div className="container uk-animation-fade">
        <button
          className="btn btn-md btn-social mx-auto mb-2"
          style={{
            borderRadius: 0,
            color: "white",
            backgroundColor: "#DAA520",
          }}
          onClick={() =>
            swal({
              title: "Coming Soon..👍 👍 👍 ",
              text:
                "This feature will let you save this media slideshow to your personal gallery to be viewed anytime",
            })
          }
        >
          <i className="fa fa-save"></i> Save To Gallery
        </button>
        {posters ? <ImageGallery items={this.state.images} /> : null}
      </div>
    );
  }
}

export default MovieGallery;
