/* eslint-disable react/prop-types */

import Button from "../button/Button";

// eslint-disable-next-line no-unused-vars
const Card = ({ data }) => {
  return (
    <div className="card">
      <img
        src={`data:image/jpeg;base64,${data?.image}`}
        className="card-img-top"
        alt="..."
        style={{
          width: "100%",
          height: "230px",
          objectFit: "cover",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{data?.description}</h5>
        <p className="card-text">{data?.description}</p>
        <div className="card-button">
          <Button
            bgc="blue"
            noBorder={true}
            to={`/detail-quiz/${data?.id}`}
            state={{ state: { description: data?.description } }}
          >
            Start now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
