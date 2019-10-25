export function render(field) {
    let html = '<table>';
    for (let i = 0; i < field.dimension; ++i) {
        let row = '<tr>';
        for (let j = 0; j < field.dimension; ++j) {
            let cell = '<td>';
            const cellModel = field.table[i][j];
            if (cellModel.checked) {
                if (cellModel.isMine) {
                    cell += '💣';
                } else {
                    cell += cellModel.neighbours;
                }
            }
            if (cellModel.flagged) {
                cell += '⚑';
            }
            cell += '</td>';
            row += cell;
        }
        row += '</tr>';
        html += row;
    }
    html += '</table>';
    return html;
}
