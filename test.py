from win32gui import GetForegroundWindow
import psutil
import time
import win32process
import json
import atexit

process_time = {}
timestamp = {}

out_file = open("output.json", "w")

#exit handler that writes data before terminating
def exitHandler(out_file, result):
    out_file.write(result)
    out_file.write("\n")
    out_file.flush()
    



while True:

    prev_count = len(process_time.keys())
    try:
        current_app = psutil.Process(win32process.GetWindowThreadProcessId(GetForegroundWindow())[1]).name().replace(".exe", " ")
    except:
        out_file.write(result)
        out_file.write("\n")
        out_file.flush()
        continue
    timestamp[current_app] = int(time.time())
    time.sleep(1)
    if current_app not in process_time.keys():
        process_time[current_app] = 0
    process_time[current_app] = process_time[current_app] + int(time.time()) - timestamp[current_app]
    #print(process_time)
    #process_time = str(process_time)

    #prev count stores previou number of keys


    #keysList = process_time.keys()

    #stores current number of keys
    curr_count = len(process_time.keys())

    result = json.dumps(process_time)

    #check if prev count not equal to current count then write in file
    if prev_count == curr_count:
        continue

    out_file.write(result)
    out_file.write("\n")
    out_file.flush()

    print(result)
    atexit.register(exitHandler, out_file, result)





