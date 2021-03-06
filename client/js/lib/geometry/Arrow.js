

export function make_arrow(a, b, c, id_mesh) {

    let arrow =  { vertices : new Float32Array(16*3),
                    elements: new Uint32Array(28*3),
                    labels : new Int32Array(16),
                    n_vertices : 16,
                    n_elements: 28};

        const verts = get_vertices();
        let rot_x90 = make_x_rotation_matrix(Math.PI/2.0);
        let rot_y90 = make_y_rotation_matrix(Math.PI/2.0);
        let rot_z90 = make_z_rotation_matrix(Math.PI);

        for (let j = 0; j < 16; j++) {
            let v = [verts[j*3 + 0]*0.5, verts[j*3 + 1], verts[j*3 + 2]];
            v = numeric.dot(rot_y90, v);
            v = numeric.dot(rot_x90, v);
            v = numeric.dot(rot_y90, v);
            arrow.vertices[j*3 + 0] = v[0];
            arrow.vertices[j*3 + 1] = v[1] + c;
            arrow.vertices[j*3 + 2] = v[2];
        }


        const elems = get_elements();
            for (let j = 0; j < 28; j++) {
                arrow.elements[j*3 + 0] = elems[j*3 + 0];
                arrow.elements[j*3 + 1] = elems[j*3 + 1];
                arrow.elements[j*3 + 2] = elems[j*3 + 2];
            }

        for (let j = 0; j < 16; j++)
            arrow.labels[j] = (id_mesh & 0x000000FF) | (3 << 8);

        return arrow;
}

function make_z_rotation_matrix(angle) {
    return [[Math.cos(angle), -Math.sin(angle), 0], [Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]];
}

function make_x_rotation_matrix(angle) {
    return [[1, 0, 0] , [0, Math.cos(angle), -Math.sin(angle)], [0, Math.sin(angle), Math.cos(angle)]];
}

function make_y_rotation_matrix(angle) {
    return [[Math.cos(angle), 0, Math.sin(angle)] , [0, 1, 0], [-Math.sin(angle), 0, Math.cos(angle)]];
}

function get_vertices() {
    return [0,    0.1333,    0.0400,
                 0,         0,         0,
                 0,         0,    0.0400,
                 0,    0.1333,         0,
            0.7333,    0.1333,    0.0400,
            0.7333,    0.1333,         0,
            0.7333,    0.2667,    0.0400,
            0.7333,    0.2667,         0,
            1.0000,         0,         0,
            1.0000,         0,    0.0400,
            0.7333,   -0.2667,         0,
            0.7333,   -0.2667,    0.0400,
            0.7333,   -0.1333,    0.0400,
            0.7333,   -0.1333,         0,
                 0,   -0.1333,    0.0400,
                 0,   -0.1333,         0];
}

function get_elements() {
    return [
             0,     1,     2,
             3,     1,     0,
             4,     3,     0,
             5,     3,     4,
             6,     5,     4,
             7,     5,     6,
             8,     7,     6,
             8,     6,     9,
            10,     8,     9,
            10,     9,    11,
            12,    10,    11,
            13,    10,    12,
            14,    13,    12,
            15,    13,    14,
             2,    15,    14,
             1,    15,     2,
            15,     1,    13,
             1,     3,     5,
            13,     1,     5,
             5,     7,     8,
            10,    13,     8,
            13,     5,     8,
            12,     2,    14,
             4,     0,     2,
             4,     2,    12,
             9,     6,     4,
             9,    12,    11,
             9,     4,    12];
}


        // 1.0000*0.5 - a,         0,   -1.0000,
        //                                         1.0000*0.5 - a,         0,    1.0000,
        //                                        -1.0000*0.5 - a,         0,    1.0000,
        //                                        -1.0000*0.5 - a,         0,   -1.0000,
        //                                              0*0.5 - a,         0,         0,
        //                                              0*0.5 - a,         0,   -0.1000,
        //                                        -2.2000*0.5 - a,         0,   -0.1000,
        //                                        -0.6000*0.5 - a,         0,   -0.1000,
        //                                        -0.6000*0.5 - a,         0,   -0.3000,
        //                                        -1.0000*0.5 - a,         0,         0,
        //                                        -0.6000*0.5 - a,         0,    0.3000,
        //                                        -0.6000*0.5 - a,         0,    0.1000,
        //                                              0*0.5 - a,         0,    0.1000,
        //                                        -0.3000*0.5 - a,         0,   -0.0500,
        //                                        -0.1625*0.5 - a,         0,    0.0500,
        //                                        -0.0876*0.5 - a,         0,   -0.0080,
        //                                        -0.4464*0.5 - a,         0,   -0.0019,
        //                                        -0.0625*0.5 - a,         0,    0.0355,
        //                                        -0.7483*0.5 - a,         0,         0,
        //                                        -0.1620*0.5 - a,         0,   -0.0138,
        //                                        -0.3342*0.5 - a,         0,    0.0169,
        //
        //                                        1.0000,         0,    1.0000*0.5  - b,
        //                                       -1.0000,         0,    1.0000*0.5  - b,
        //                                       -1.0000,         0,   -1.0000*0.5  - b,
        //                                        1.0000,         0,   -1.0000*0.5  - b,
        //                                             0,         0,         0*0.5  - b,
        //                                        0.1000,         0,         0*0.5  - b,
        //                                        0.1000,         0,   -2.2000*0.5  - b,
        //                                        0.1000,         0,   -0.6000*0.5  - b,
        //                                        0.3000,         0,   -0.6000*0.5  - b,
        //                                             0,         0,   -1.0000*0.5  - b,
        //                                       -0.3000,         0,   -0.6000*0.5  - b,
        //                                       -0.1000,         0,   -0.6000*0.5  - b,
        //                                       -0.1000,         0,         0*0.5  - b,
        //                                        0.0500,         0,   -0.3000*0.5  - b,
        //                                       -0.0500,         0,   -0.1625*0.5  - b,
        //                                        0.0080,         0,   -0.0876*0.5  - b,
        //                                        0.0019,         0,   -0.4464*0.5  - b,
        //                                       -0.0355,         0,   -0.0625*0.5  - b,
        //                                             0,         0,   -0.7483*0.5  - b,
        //                                        0.0138,         0,   -0.1620*0.5  - b,
        //                                       -0.0169,         0,   -0.3342*0.5  - b,
        //
        //
        //                                                0,   -1.0000*0.5 + c,    1.0000,
        //                                                0,   -1.0000*0.5 + c,   -1.0000,
        //                                                0,    1.0000*0.5 + c,   -1.0000,
        //                                                0,    1.0000*0.5 + c,    1.0000,
        //                                                0,         0*0.5 + c,         0,
        //                                                0,         0*0.5 + c,    0.1000,
        //                                                0,    2.2000*0.5 + c,    0.1000,
        //                                                0,    0.6000*0.5 + c,    0.1000,
        //                                                0,    0.6000*0.5 + c,    0.3000,
        //                                                0,    1.0000*0.5 + c,         0,
        //                                                0,    0.6000*0.5 + c,   -0.3000,
        //                                                0,    0.6000*0.5 + c,   -0.1000,
        //                                                0,         0*0.5 + c,   -0.1000,
        //                                                0,    0.3000*0.5 + c,    0.0500,
        //                                                0,    0.1625*0.5 + c,   -0.0500,
        //                                                0,    0.0876*0.5 + c,    0.0080,
        //                                                0,    0.4464*0.5 + c,    0.0019,
        //                                                0,    0.0625*0.5 + c,   -0.0355,
        //                                                0,    0.7483*0.5 + c,         0,
        //                                                0,    0.1620*0.5 + c,    0.0138,
        //                                                0,    0.3342*0.5 + c,   -0.0169]
