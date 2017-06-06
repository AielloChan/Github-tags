export function fetchData(options, cb) {
    chrome.storage.local.get(['repo_addr'], function (store) {
        var url = 'https://api.github.com/repos/' + store.repo_addr + '/contents/data.json';
        axios({
            url: url,
            method: "get",
            headers: {
                "Cache-Control": "no-cache"
            },
            responseType: 'json'
        }).then(function (response) {

            if (response.status == 200) {
                var used_tags = [],
                    unused_tags = [];


                var data = JSON.parse(
                    Base64.decode(response.data.content.replace(/\n/g, ''))
                );
                var tagIndexs = data.repos[options.currentRepo];

                // get used tags
                if (tagIndexs && tagIndexs.length > 0) {
                    tagIndexs.forEach(function (index) {
                        used_tags.push({
                            id: 1 * index,
                            name: data.tags[index]
                        })
                        delete data.tags[index]
                    });
                }

                // process unused tags
                for (var index in data.tags) {
                    unused_tags.push({
                        id: index,
                        name: data.tags[index]
                    });
                }


                cb({
                    code: response.status,
                    data: {
                        tags_count: data.global_tag_index,
                        used_tags: used_tags,
                        unused_tags: unused_tags
                    }
                });

            } else {

                cb({
                    code: response.status,
                    error: response.data.message
                });

            }
        })
    });
}

export function saveData(options, cb) {
    chrome.storage.local.get(['repo_addr', 'token'], function (store) {
        var url = 'https://api.github.com/repos/' + store.repo_addr + '/contents/data.json';
        axios({
            url: url,
            method: "get",
            headers: {
                "Cache-Control": "no-cache"
            },
            responseType: 'json'
        }).then(function (response) {
            var data = JSON.parse(
                Base64.decode(response.data.content.replace(/\n/g, ''))
            );

            var indexs = options.content.used_tags.map(function (tag) {
                if (!data.tags[tag.id]) {
                    data.tags[tag.id] = tag.name;
                }
                return tag.id;
            }).sort(function (a, b) {
                return a > b
            })

            if (indexs.length < 1) {
                if (data.repos[options.currentRepo])
                    delete data.repos[options.currentRepo];

            } else if (!data.repos[options.currentRepo]) {
                data.repos[options.currentRepo] = indexs;
            } else if (data.repos[options.currentRepo].toString() == indexs.toString()) {

                cb({
                    code: 200
                });
                return;

            } else {
                data.repos[options.currentRepo] = indexs;
            }

            var new_index = indexs[indexs.length - 1] + 1
            data.global_tag_index = data.global_tag_index > new_index ?
                data.global_tag_index : new_index;

            // upload
            axios({
                url: url,
                method: "put",
                headers: {
                    // "Authorization": "token b44cbff658e1bb8e71e730179d36f9b285b8dead"
                    "Authorization": "token " + store.token
                },
                data: {
                    "message": options.message || "my commit message",
                    "committer": {
                        "name": "Aiello Chan",
                        "email": "aiello.chan@gmail.com"
                    },
                    "content": Base64.encode(JSON.stringify(data)),
                    "sha": response.data.sha
                },
                responseType: 'json'
            }).then(function (resp) {
                if (resp.data.commit) {
                    cb({
                        code: resp.status,
                        error: resp.data.message
                    });
                } else {
                    cb({
                        code: 200
                    });
                }
            })
        })
    })
}