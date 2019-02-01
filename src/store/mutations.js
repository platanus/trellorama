const sortValue = 1;

export function saveBoards(state, data) {
  state.boards = data;
}

export function setLabels(state, data) {
  state.labels = data.map((label) => ({
    label: label.name,
    value: label.id,
    color: label.color,
  }));
  state.labels.push({ label: 'No Label', value: null });
  state.labels.sort((a, b) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) return -sortValue;
    if (a.label.toLowerCase() > b.label.toLowerCase()) return sortValue;

    return 0;
  });
}
