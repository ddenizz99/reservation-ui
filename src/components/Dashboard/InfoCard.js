import LoadingIndicator from "./LoadingIndicator";
const InfoCard = ({ title, value, icon, backGround, isLoading }) => (
    <div className={`card radius-15 bg-${backGround}`}>
      <div className="card-body">
        {isLoading ? <LoadingIndicator color="text-white" padding="p-4" /> : (
          <>
            <div className="d-flex align-items-center">
              <div>
              <h2 className="mb-0 text-white">{value} {/* <i className="bx bxs-up-arrow-alt font-14 text-white" /> */} </h2>
              </div>
              <div className="ms-auto font-35 text-white"><i className={`bx ${icon}`} /></div>
            </div>
            <div className="d-flex align-items-center">
                <div>
                    <p className="mb-0 text-white">{title}</p>
                </div>
                {/* <div className="ms-auto font-14 text-white">+23.4%</div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  export default InfoCard;