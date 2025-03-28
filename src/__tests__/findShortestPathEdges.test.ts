import { findShortestPathEdges } from "../scripts/AlgorithmeFord"; // Ajuste le chemin si besoin

describe("findShortestPathEdges", () => {
  const edges: any[] = [
    { source: "1", target: "2", label: "7" },
    { source: "1", target: "3", label: "9" },
    { source: "2", target: "4", label: "10" },
    { source: "3", target: "4", label: "11" },
    { source: "4", target: "5", label: "6" },
  ];

  const predecessor = {
    "2": "1",
    "3": "1",
    "4": "2",
    "5": "4",
  };

  const upEdge = () => {}
  const upNode = () => {}
  
  it("devrait trouver les arêtes du plus court chemin", () => {
    console.log = jest.fn(); // Intercepter les logs

    findShortestPathEdges(edges, predecessor, "5", "1" ,upEdge, upNode);

    expect(console.log).toHaveBeenCalledWith({
      source: "4",
      target: "5",
      label: "6",
    });

    expect(console.log).toHaveBeenCalledWith({
      source: "2",
      target: "4",
      label: "10",
    });

    expect(console.log).toHaveBeenCalledWith({
      source: "1",
      target: "2",
      label: "7",
    });
  });

  it("ne devrait rien loguer si le nœud cible est la source", () => {
    console.log = jest.fn();

    findShortestPathEdges(edges, predecessor, "1", "1" , upEdge, upNode);

    expect(console.log).not.toHaveBeenCalled();
  });

  it("ne devrait rien loguer si le chemin est impossible", () => {
    console.log = jest.fn();

    findShortestPathEdges(edges, predecessor, "99", "1" , upEdge, upNode);

    expect(console.log).not.toHaveBeenCalled();
  });
});
