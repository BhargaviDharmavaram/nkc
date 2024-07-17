import React from "react";

const EarningsList = ({earnings}) => {

    return(
        <div>
            <h1> Earnings List </h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {earnings && earnings.map((earning, i) => {
                        return (
                            <tr key={earning._id}>
                                <td>{i + 1}</td>
                                <td>{new Date(earning.date).toISOString().split('T')[0]}</td>
                                <td>{earning.amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EarningsList