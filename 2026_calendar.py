import calendar
def glass(text):
    lines = text.splitlines()
    w = max(len(l) for l in lines)
    print("-"*(w+4))
    for l in lines:
        print("| "+l.ljust(w)+" |")
    print("-"*(w+4))

for m in range(1,13):
    glass(calendar.month(2026,m))
