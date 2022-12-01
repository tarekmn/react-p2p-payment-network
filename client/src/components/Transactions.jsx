const Transaction = () => {
  return (
    <>
      <form>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="John"
          />
          <label htmlFor="floatingInput">Username</label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="first_name"
            placeholder="John"
          />
          <label htmlFor="floatingInput">$$$</label>
        </div>
      </form>
    </>
  );
};

export default Transaction;
