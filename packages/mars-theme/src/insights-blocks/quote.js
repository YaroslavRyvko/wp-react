function ArticleQuote({ fields }) {
    return (
      <blockquote className="article__quote text-l">
        {fields.text}
      </blockquote>
    );
  }

export default ArticleQuote;

