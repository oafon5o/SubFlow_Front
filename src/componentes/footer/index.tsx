function Footer(){
    const headerBgColor = "#1c2c4b";

    return(
        <footer style={{ backgroundColor: headerBgColor }} className="text-white py-3 text-center">
            <p className="mb-0">
                &copy; {new Date().getFullYear()} Afonso Souza S. Todos os Direitos Reservados.
            </p>
        </footer>);
}

export default Footer;