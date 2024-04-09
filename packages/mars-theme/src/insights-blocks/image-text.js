import { css } from "frontity";

const ArticleImageText = ({ fields }) => {
    return (
      <div className="article__image-text">
        {fields.image && (
          <div className="article__image-text__image">
            {/* Припускаючи, що у вас є компонент або функція для вставки зображень */}
            <img src={fields.image.url} alt={fields.image.alt || 'Article image'} />
          </div>
        )}
        {fields.text && (
          <div className="article__image-text__text article__subtitle title-2">
            {fields.text}
          </div>
        )}
      </div>
    );
  };
  
  export default ArticleImageText;

const styles = css`
padding-top: 11rem;
overflow: hidden;

@media screen and (max-width: 1025px) {
  padding-top: 7rem;
}
    .hero2 {

        &__title {
            max-width: 92rem;
            padding-left: 11rem;
            font-family: "HelveticaNow", sans-serif;
            font-size: 8rem;
            font-weight: 700;
            line-height: 1.1;
          
            @media screen and (max-width: 1025px) {
              padding-left: 0;
              font-size: 4rem;
            }
          }
          
          &__image {
            width: 100%;
            height: 63rem;
            position: relative;
            bottom: -8rem;
            margin-bottom: -8rem;
          
            @media screen and (max-width: 1025px) {
              width: 100vw;
              height: 36rem;
              left: 50%;
              right: 50%;
              bottom: -9rem;
              margin-left: -50vw;
              margin-right: -50vw;
              margin-bottom: 2rem;
              max-width: 100vw;
            }
          
            @media screen and (max-width: 768px) {
              height: 30rem;
            }
            
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: top;
            }
          }
    }
  }
`;
