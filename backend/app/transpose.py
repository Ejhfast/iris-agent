import fileinput

map_ = {
    "19.0": "acute_myeloid_leukemia",
    "8.0": "stomach_adenocarcinoma",
    "5.0": "glioblastoma",
    "21.0": "endocervical_adenocarcinoma",
    "10.0": "colorectal_carcinoma"
}

for i,line in enumerate(fileinput.input()):
    if i == 0:
        print(line.strip())
        continue
    cols = line.strip().split(",")
    cols[-1] = map_[cols[-1]]
    print(",".join(cols))
