export interface node {
    id: string;
    isShow:boolean;
}

export type edge=[string, string];

export function unshowUnusedGatewayNodes({edges, nodes}:{edges: edge[], nodes: any[]}): any[] {
    // Создаем карту узлов для быстрого доступа
    const nodeMap = new Map<string, any>(nodes.map(node => [node.id, node]));

    // Создаем список соседей для каждого узла
    const adjacencyList = new Map<string, Set<string>>();
    edges.forEach(([u, v]) => {
        if (!adjacencyList.has(u)) adjacencyList.set(u, new Set());
        adjacencyList.get(u)!.add(v);
        if (!adjacencyList.has(v)) adjacencyList.set(v, new Set());
        adjacencyList.get(v)!.add(u);
    });

    // Проходим по всем узлам типа VtzGatewayNode
    nodes.forEach(node => {
        if (node.type === 'VtzGatewayNode') {
            let hasTaskNeighbor = false; // Флаг для проверки связи с VtzTaskNode

            // Получаем всех соседей текущего узла
            const neighbors = adjacencyList.get(node.id) || new Set();
            for (const neighborId of neighbors) {
                const neighborNode = nodeMap.get(neighborId);
                if (neighborNode?.type === 'VtzTaskNode') {
                    hasTaskNeighbor = true;
                    break; // Если нашли хотя бы одного соседа-задачи, выходим
                }
            }

            // Если нет связей с VtzTaskNode — скрываем узел
            if (!hasTaskNeighbor) {
                node.data.isVisible = false;
            }
        }
    });

    return nodes;
}

export function filterAndRewireGraph({edges, nodes}:{ edges: edge[], nodes: node[]}): edge[] {

    // 1. Создаем структуру графа для быстрого доступа к соседям <button class="citation-flag" data-index="4">
    const adjacencyList: { [key: string]: string[] } = {};
    edges.forEach(([u, v]) => {
        if (!adjacencyList[u]) adjacencyList[u] = [];
        if (!adjacencyList[v]) adjacencyList[v] = [];
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    });

    // 2. Создаем множество существующих ребер для проверки <button class="citation-flag" data-index="2">
    const existingEdges = new Set<string>();
    edges.forEach(([u, v]) => {
        // Сохраняем ребра как отсортированные пары для уникальности
        const [a, b] = [u, v].sort();
        existingEdges.add(`${a}-${b}`);
    });

    // 3. Список вершин для удаления
    const removedNodes = new Set(
        nodes.filter(node => node.isShow===false).map(node => node.id)
    );

    //console.log('nodes.filter(node => !node.isShow).map(node => node.id)',  nodes.filter(node => node.isShow===false).length);

    //console.log('removedNodes',  removedNodes);


    // 4. Множество для хранения результата
    const resultEdges = new Set<string>();

    // 5. Добавляем оставшиеся исходные ребра
    edges.forEach(([u, v]) => {
        if (!removedNodes.has(u) && !removedNodes.has(v)) {
            resultEdges.add(JSON.stringify([u, v])); // Сохраняем полный UUID <button class="citation-flag" data-index="8">
        }
    });

    // 6. Добавляем связи между соседями удаленных вершин
    removedNodes.forEach(nodeId => {
        const neighbors = adjacencyList[nodeId] || [];
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = i + 1; j < neighbors.length; j++) {
                const u = neighbors[i];
                const v = neighbors[j];
                // Проверяем, существует ли связь в исходном графе <button class="citation-flag" data-index="2">
                const edgeKey = [u, v].sort().join('-');
                if (!existingEdges.has(edgeKey)) {
                    resultEdges.add(JSON.stringify([u, v])); // Полный UUID <button class="citation-flag" data-index="8">
                }
            }
        }
    });

    // 7. Преобразуем результат в массив
    return Array.from(resultEdges).map(edge => JSON.parse(edge));
}

export function filterEdgesWithoutSelfLoops(edges: edge[]): edge[] {
    return edges.filter(([u, v]) => u !== v); // Удаляем ребра с одинаковыми UUID <button class="citation-flag" data-index="1">
}

export function removeDuplicateEdges(pairs: edge[]): edge[] {
    const uniqueKeys = new Set<string>();

    return pairs.filter(pair => {
        // Нормализуем пару, сортируя UUID для идентификации дубликатов <button class="citation-flag" data-index="3">
        const [a, b] = pair;
        const key = `${a}-${b}`;

        if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return true;
        }
        return false;
    });
}

// Пример использования с произвольными строками
// const edges:edge[] = [
//     ["1", "2" ],
//     ["1", "16"],
//
//     ["2", "3" ],
//     ["2", "4"],
//
//     ["3", "5" ],
//
//     ["4", "11" ],
//
//     ["5", "11" ],
//     ["5", "6"],
//
//     ["6", "7" ],
//
//     ["7", "8" ],
//     ["7", "10" ],
//     ["7", "11" ],
//
//     ["8", "9" ],
//
//     ["9", "10" ],
//     ["9", "14" ],
//     ["9",  "15" ],
//
//     ["10",  "11" ],
//     [ "10",  "14" ],
//
//     ["11", "12" ],
//
//     ["12",  "16" ],
//
//     ["13",  "16" ],
//     ["13",  "14" ],
//     ["13",  "15" ],
//
// ];

// const nodes:node[] = [
//     { id: "1", isShow: false },
//     { id: "2", isShow: true },
//     { id: "3", isShow: true },
//     { id: "4", isShow: true },
//     { id: "5", isShow: true },
//     { id: "6", isShow: true },
//     { id: "7", isShow: true },
//     { id: "8", isShow: false },
//     { id: "9", isShow: true },
//     { id: "10", isShow: true },
//     { id: "11", isShow: false },
//     { id: "12", isShow: true },
//     { id: "13", isShow: true },
//     { id: "14", isShow: true },
//     { id: "15", isShow: true },
//     { id: "16", isShow: true },
// ];


//
// const result:edge[] = filterAndRewireGraph(edges, nodes);

// function sortEdgesNumerically(edges: edge[]): edge[] {
//     // Вспомогательная функция для преобразования строки в число или NaN
//     const toNumber = (str: string): number => {
//         const num = Number(str);
//         return isNaN(num) ? Infinity : num; // Не числа идут в конец
//     };
//
//     // 1. Сортируем строки внутри каждого edge как числа
//     const sortedEdges:edge[] = edges.map(edge => {
//         const [a, b] = edge;
//         const numA = toNumber(a);
//         const numB = toNumber(b);
//         if (numA > numB) return [b, a];
//         return [a, b];
//     });
//
//     // 2. Сортируем массив edge:
//     //   - Сначала по первому элементу (числовое значение)
//     //   - Затем по второму элементу (числовое значение)
//     return sortedEdges.sort((a, b) => {
//         const a0 = toNumber(a[0]);
//         const b0 = toNumber(b[0]);
//
//         if (a0 !== b0) return a0 - b0;
//
//         const a1 = toNumber(a[1]);
//         const b1 = toNumber(b[1]);
//         return a1 - b1;
//     });
// }

// console.log(sortEdgesNumerically(result));





















