const Customer = ({nama, alamat, membership}) => {
    return(
        <div>
            <p>Nama: {nama}</p>
            <p>Alamat: {alamat}</p>
            <p>Membership:  {membership}</p>
        <button>Detail</button>
        </div>
    )
}

export default Customer;

