function status(request, response) {
  response.status(200).json({ message: "boa noite" });
}

export default status;
