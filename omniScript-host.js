export async function main(ns) {
    function multiScan(hostname, prev, depth) {

        var node = {
            name: hostname,
            children: []
        };

        var scans = ns.scan(hostname);

        if (depth > 0) {
            for (var i = 0; i < scans.length; i++) {
                if (scans[i] == prev) {
                    continue;
                }
                node.children.push(multiScan(scans[i], hostname, depth - 1));
            }
        }
        return node;
    }

    var start = ns.args[1] || "home";
    var depth = ns.args[0] || 1;
    var scans = multiScan(start, null, depth);

    function display(node, depth) {
        var line = "";
        for (var i = 0; i < depth; i++) {
            line += " ";
        }
        line += node.name;
        ns.tprint(line);
        for (var i = 0; i < node.children.length; i++)
            display(node.children[i], depth + 1);
    }

    display(scans, 0);
}
