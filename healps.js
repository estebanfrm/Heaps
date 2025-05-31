class MinHeap {
    constructor(maxSize){
        this.heap=new Array(maxSize);
        this.size=0;
        this.maxSize=maxSize;
    }

    parentIndex(i){
        return Math.floor((i-1)/2);
    }

    leftChildIndex(i){
        return 2*i+1;

    }
    rightChildIndex(i){
        return 2*i+2;
    }

    isLeaf(i){
        return (
            this.leftChildIndex(i) >=this.size &&
            this.rightChildIndex(i) >=this.size
        );
    }

    swap(i, j){
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(element){
        if (this.size >= this.maxSize) {
            console.warn("Heap is full");
            return;
        }

        this.heap[this.size] = element;
        let current = this.size;

        while (
            current > 0 &&
            this.heap[current] < this.heap[this.parentIndex(current)]
        )   {
            this.swap(current, this.parentIndex(current));
            current = this.parentIndex(current);
        }

        this.size++;
    }
    
    extractMin() {
        if (this.size <= 0) return Number.NEGATIVE_INFINITY;
        
        const popped = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.minHeapify(0);
        return popped;
    }
    
    minHeapify(i) {
        if (!this.isLeaf(i)) {
            const left = this.leftChildIndex(i);
            const right = this.rightChildIndex(i);
            
            let smallest = i;
            
            if (left < this.size && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
        
            if (right < this.size && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
        
            if (smallest !== i) {
                this.swap(i, smallest);
                this.minHeapify(smallest);
            }
        }
    }

    printHeapPretty() {
        for (let i = 0; i < Math.floor(this.size / 2); i++) {
            const left = this.leftChildIndex(i);
            const right = this.rightChildIndex(i);
            
            let output = `Parent: ${this.heap[i]}`;
            if (left < this.size) output += ` Left: ${this.heap[left]}`;
            if (right < this.size) output += ` Right: ${this.heap[right]}`;
            console.log(output);
        }
    }
    
    printHeap() {
        console.log(this.heap.slice(0, this.size));
    }
}
    
function insertRandomNumbersToHeap(heap, n, max = 100) {
    console.log(`Insertando ${n} números aleatorios en el heap:\n`);
    
    for (let i = 0; i < n; i++) {
        const num = Math.floor(Math.random() * max); // Número entre 0 y max-1
        console.log(`Insertando: ${num}`);
        heap.insert(num);
    }
    
    console.log("\n ---- Representación del heap: ----");
    heap.printHeapPretty();
    
    console.log("\n ---- Heap como arreglo: ----");
    heap.printHeap();
    
    console.log("\n ---- Extraer mínimo: ----");
    console.log("Min:", heap.extractMin());
    
    console.log("\n ---- Heap después de extraer mínimo: ----");
    heap.printHeap();
}
    
const heap = new MinHeap(50); // tamaño máximo arbitrario
    insertRandomNumbersToHeap(heap, 20); // inserta 20 números aleatorios

    //ACTIVIDAD
    
    class Task { // Aquí se ejecutra la logica para insertar tareas con un nombre y una prioridad.
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }

    toString() {
        return `${this.name} (Prioridad: ${this.priority})`;
    }
}

    class TaskMinHeap { //Aquí se ejecutará la lógica para extraer la tarea mas prioritaria e imprimir el estado actual del heap

    //Extraer la tarea mas prioritaria
    constructor(maxSize) {
        this.heap = new Array(maxSize); //Arreglo para almacenar tareas
        this.size = 0; //contador de elementos actuales
        this.maxSize = maxSize; //Capacidad max del heap
    }

    parentIndex(i) { //Calcula el índice del padre de un nodo dado
        return Math.floor((i - 1) / 2);
    }

    leftChildIndex(i) { //Calcula el índice del hijo izquierd
        return 2 * i + 1;
    }

    rightChildIndex(i) { //Calcula el índice del hijo derecho
        return 2 * i + 2;
    }

    isLeaf(i) { //verifica si un nodo no tiene hijos
        return this.leftChildIndex(i) >= this.size;
    }

    //Intercambia dos elementos en el heap
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    //Inserta una nueva tarea en el heap
    insert(task) {
        if (this.size >= this.maxSize) {
            console.warn("La cola de tareas está llena.");
            return;
        }

        // Coloca la tarea al final del heap
        this.heap[this.size] = task;
        let current = this.size;

        // Reordena hacia arriba (up-heap) para mantener la propiedad del heap
        while (
            current > 0 &&
            this.heap[current].priority < this.heap[this.parentIndex(current)].priority
        ) {
            this.swap(current, this.parentIndex(current));
            current = this.parentIndex(current);
        }

        this.size++; // Incrementa el contador de elementos
    }

    // Extrae y devuelve la tarea con mayor prioridad (mínima prioridad numérica)
    extractMin() {
        if (this.size === 0) {
            console.warn("No hay tareas pendientes.");
            return null;
        }

        const min = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.minHeapify(0);
        return min;
    }

    // Reordena el subárbol para mantener la propiedad del min-heap
    minHeapify(i) {
        if (this.isLeaf(i)) return; // Si es hoja, no hace nada

        const left = this.leftChildIndex(i);
        const right = this.rightChildIndex(i);
        let smallest = i;

        // Compara con el hijo izquierdo
        if (left < this.size && this.heap[left].priority < this.heap[smallest].priority) {
            smallest = left;
        }
        // Compara con el hijo derecho
        if (right < this.size && this.heap[right].priority < this.heap[smallest].priority) {
            smallest = right;
        }
        // Si encontró un hijo menor, intercambia y continúa reordenando
        if (smallest !== i) {
            this.swap(i, smallest);
            this.minHeapify(smallest);
        }
    }

    // Muestra el heap en formato de árbol jerárquico
    printHeapPretty() {
        console.log("\n--- Estado actual del heap (estructura): ---");
        for (let i = 0; i < Math.floor(this.size / 2); i++) {
            const left = this.leftChildIndex(i);
            const right = this.rightChildIndex(i);

            let output = `Tarea: ${this.heap[i].toString()}`;
            if (left < this.size) output += ` | Izq: ${this.heap[left].toString()}`;
            if (right < this.size) output += ` | Der: ${this.heap[right].toString()}`;
            console.log(output);
        }
    }
    // Muestra el heap como arreglo ordenado
    printHeapArray() {
        console.log("\n--- Heap como arreglo ---");
        console.log(this.heap.slice(0, this.size).map(t => t.toString()));
    }
}

//prueba de uso

function demo() {
    // Crea un nuevo Min-Heap con capacidad para 10 tareas
    const taskHeap = new TaskMinHeap(10);

    // Crea un array de tareas de ejemplo con diferentes prioridades
    const tasks = [
        new Task("Hacer informe", 3),
        new Task("Enviar correo", 1),
        new Task("Estudiar para el examen", 4),
        new Task("Llamar al profesor", 2),
        new Task("Revisar GitHub", 5),
    ];

    // Itera sobre cada tarea en el array 'tasks'
    tasks.forEach(task => {
        console.log("Insertando:", task.toString());  // Muestra en consola qué tarea se está insertando
        taskHeap.insert(task);   // Inserta la tarea en el Min-Heap
    });

    taskHeap.printHeapPretty();    // Muestra el heap en formato de árbol jerárquico
    taskHeap.printHeapArray();    // Muestra el heap como array ordenado (para ver la estructura interna)

    console.log("\n--- Extrayendo tareas por prioridad ---");
    // Extrae todas las tareas del heap, una por una, en orden de prioridad
    while (taskHeap.size > 0) {
        const minTask = taskHeap.extractMin();        // Extrae la tarea con mayor prioridad (menor valor numérico)
        console.log("Extraída:", minTask.toString()); // Muestra la tarea extraída
    }
    // Al finalizar, el heap estará vacío

}