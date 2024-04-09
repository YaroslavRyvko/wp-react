import PresentationIcon from "../images/presentation-icon";
import PdfIcon from "../images/pdf-icon";


function ArticleLinks({ fields }) {
    return (
      <div className="article__links">
        {fields.links && fields.links.map((item, index) => (
          item.link.subtype !== 'pdf' ? (
            <a key={index} href={item.link.url} download className="white-cta white-cta-s-icon link">
              <span><PresentationIcon /></span>
              <span>{item.link.title}</span>
            </a>
          ) : (
            <a key={index} href={item.link.url} download className="black-cta-l black-cta-s-icon link">
              <span><PdfIcon /></span>
              <span>{item.link.title}</span>
            </a>
          )
        ))}
      </div>
    );
  }

export default ArticleLinks;

