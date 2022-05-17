// Buscar os links salvos.
export const getLinksSave = async (key) => {
  const myLinks = await localStorage.getItem(key);
  let linksSaves = JSON.parse(myLinks) || [];
  return linksSaves;
};

// Salvar um link no localStorage.
export const saveLink = async (key, newLink) => {
  let linksStored = await getLinksSave(key);

  // Se já tiver um link salvo, se tiver não salva novamente!
  const hasLink = linksStored.some((link) => link.id === newLink.id);
  if (hasLink) {
    alert("Esse link já existe na sua lista!");
    return;
  }

  // Adicionar esse novo link na lista...
  linksStored.push(newLink);
  await localStorage.setItem(key, JSON.stringify(linksStored));
  alert("Link salvo com sucesso!");
};

// Deletar algum link salvo.
export const deleteLink = async (links, id) => {
  let myLinks = links.filter((item) => {
    return (item.id !== id);
  });

  await localStorage.setItem("@encurtaLink", JSON.stringify(myLinks));
  alert("Link deletado com sucesso!");
  return myLinks;
};
