function newBimModel(projectid) {
    if ([924, 925, 926, 927, 928, 929, 930, 1104, 1500, 1593, 1695, 1696, 1697, 1698, 1700, 1699, 1701, 1702, 1881, 1884, 1885, 1890, 1887].indexOf(parseInt(projectid)) == -1) {
        return true;
    } else {
        return false;
    }
}