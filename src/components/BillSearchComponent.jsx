
import './BillSearchComponent.css';

const BillSearchComponent = (props) => {
  return (
    <div className="search-component">
     <div className="filter">
        <label htmlFor="bill-category">Bill Category:</label>
        <select id="bill-category" name="bill-category" className="custom-dropdown">
          <option value="House Rent">House Rent</option>
          <option value="Debt Payments">Debt Payments</option>
          <option value="Groceries">Groceries</option>
          <option value="Internet Charges">Internet Charges</option>
          <option value="Cellphone Charges">Cellphone Charges</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="bill-name">Bill Name:</label>
        <input type="text" id="bill-name" name="bill-name" className="custom-input" />
      </div>
    </div>
  );
};

export default BillSearchComponent;