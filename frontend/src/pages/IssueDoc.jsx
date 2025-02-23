import { useState, useRef, useEffect } from 'react'
import { SketchPicker } from 'react-color'

const IssueDoc = () => {
  const [imageSrc, setImageSrc] = useState(null)
  const [image, setImage] = useState(null)
  const [currentBox, setCurrentBox] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [currentBoxType, setCurrentBoxType] = useState('rectangle')
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null)
  const [menuVisible, setMenuVisible] = useState(true)
  const [currentColor, setCurrentColor] = useState('#b02f2f')
  const [currentBorderColor, setCurrentBorderColor] = useState('#000000')
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState('transparent')
  const [colorPickerVisible, setColorPickerVisible] = useState(false)
  const [selectedTool, setSelectedTool] = useState('select')
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => setImageSrc(reader.result)
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current
      if (!canvas) {
        console.error('Canvas element is not available')
        return
      }
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = imageSrc

      img.onload = () => {
        const aspectRatio = img.width / img.height
        const maxCanvasWidth = 1200
        const maxCanvasHeight = 700

        let canvasWidth = maxCanvasWidth
        let canvasHeight = maxCanvasHeight

        if (img.width > img.height) {
          canvasHeight = maxCanvasWidth / aspectRatio
        } else {
          canvasWidth = maxCanvasHeight * aspectRatio
        }

        canvas.width = canvasWidth
        canvas.height = canvasHeight

        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
        setImage(img)
      }
    }
  }, [imageSrc])

  useEffect(() => {
    console.log(selectedBoxIndex)
    if (selectedBoxIndex !== null) {
      console.log(boxes[selectedBoxIndex].backgroundColor)
    }
  }, [selectedBoxIndex])
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    setCurrentBox({ x1: e.clientX - rect.left, y1: e.clientY - rect.top })
    setIsDrawing(true)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    //checking if a drawing tool has been selected
    if (selectedTool != 'labelBox' && selectedTool != 'textBox') {
      alert('please select textbox or label box')
      setIsDrawing(false)
      return
    }
    const type = selectedTool === 'labelBox' ? 'labelBox' : 'textBox'
    const rect = canvasRef.current.getBoundingClientRect()
    const text = ''
    const x2 = e.clientX - rect.left
    const y2 = e.clientY - rect.top
    setCurrentBox((prevBox) => ({ ...prevBox, x2, y2, type, text }))
  }

  const handleMouseUp = () => {
    if (!isDrawing) return
    if (
      Math.abs(currentBox.x2 - currentBox.x1) > 2 &&
      Math.abs(currentBox.y2 - currentBox.y1) > 2
    ) {
      setBoxes((prevBoxes) => [
        ...prevBoxes,
        {
          ...currentBox,
          borderColor: currentBorderColor,
          backgroundColor: currentBackgroundColor
        }
      ])
    }
    setIsDrawing(false)
  }

  const handleMouseOverBox = (index) => {
    setSelectedBoxIndex(index)
    setMenuVisible(true)
  }

  const handleMouseOutBox = () => {
    setMenuVisible(false)
  }

  const handleDeleteBox = () => {
    setBoxes((prevBoxes) =>
      prevBoxes.filter((_, index) => index !== selectedBoxIndex)
    )
    setMenuVisible(false)
  }

  const handleEditBorderColor = (color) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box, index) =>
        index === selectedBoxIndex ? { ...box, borderColor: color } : box
      )
    )
    setMenuVisible(false)
  }

  const handleBackgroundColorChange = (color) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box, index) =>
        index === selectedBoxIndex
          ? { ...box, backgroundColor: color.hex }
          : box
      )
    )
    setCurrentBackgroundColor(color.hex)
  }

  useEffect(() => {
    if (!image) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    boxes.forEach((box, index) => {
      const { x1, y1, x2, y2, borderColor, backgroundColor, color } = box
      if (box.type === 'textBox') {
        ctx.font = '16px Arial'
        ctx.fillText(box.text, x1, y1 + 20)
      }
      ctx.fillStyle = backgroundColor
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1)
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 2
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1)
      // Add event listeners for hover
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
          setSelectedBoxIndex(index)
        } else {
          setSelectedBoxIndex(null)
          setCurrentBackgroundColor('transparent')
        }
      })
    })

    if (isDrawing && currentBox) {
      const { x1, y1, x2, y2 } = currentBox
      ctx.fillStyle = currentBackgroundColor
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1)
      ctx.strokeStyle = currentBorderColor
      ctx.lineWidth = 2
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1)
    }
  }, [
    boxes,
    currentBox,
    isDrawing,
    image,
    currentBackgroundColor,
    currentBorderColor
  ])

  const handleSaveTemplate = () => {
    const template = { imageSrc, boxes }
    localStorage.setItem('template', JSON.stringify(template))
    alert('Template saved!')
  }

  const handleGenerateImages = (data) => {
    const template = JSON.parse(localStorage.getItem('template'))
    if (!template) {
      alert('No template found!')
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = template.imageSrc

    img.onload = () => {
      data.forEach((item, index) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        template.boxes.forEach((box, i) => {
          const { x1, y1, x2, y2 } = box
          const text = item[i] || ''
          ctx.fillStyle = 'white'
          ctx.fillRect(x1, y1, x2 - x1, y2 - y1)
          ctx.fillStyle = 'black'
          ctx.font = '16px Arial'
          ctx.fillText(text, x1, y1 + 20)
        })
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `generated-image-${index + 1}.png`
        link.click()
      })
    }
  }

  const handleColorChange = (color) => {
    setCurrentColor(color.hex)
    setColorPickerVisible(false)
  }
  return (
    <div className='flex flex-col items-center my-4 gap-5 relative'>
      <input type='file' accept='image/*' onChange={handleImageUpload} />
      {imageSrc && (
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid black' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      )}
      {imageSrc && <button onClick={handleSaveTemplate}>Save Template</button>}
      {imageSrc && (
        <button
          onClick={() =>
            handleGenerateImages([
              ['John Doe', 'Course A'],
              ['Jane Smith', 'Course B']
            ])
          }
        >
          Generate Images
        </button>
      )}
      {imageSrc && (
        <div
          className='flex  gap-2 bg-white fixed bottom-5 p-2 rounded-2xl items-center cursor-pointer '
          onMouseLeave={handleMouseOutBox}
        >
          <span
            className='material-symbols-outlined p-1 rounded-md transition-colors duration-300 ease-in-out'
            style={{
              backgroundColor:
                selectedTool === 'select' ? '#ad6bf1' : 'transparent'
            }}
            onClick={() => setSelectedTool('select')}
          >
            arrow_selector_tool
          </span>
          <span
            className='material-symbols-outlined p-1 rounded-md transition-colors duration-300 ease-in-out'
            style={{
              backgroundColor:
                selectedTool === 'labelBox' ? '#ad6bf1' : 'transparent'
            }}
            onClick={() => setSelectedTool('labelBox')}
          >
            rectangle
          </span>
          <span
            className='relative flex p-1 rounded-md transition-colors duration-300 ease-in-out'
            style={{
              backgroundColor:
                selectedTool === 'textBox' ? '#ad6bf1' : 'transparent'
            }}
            onClick={() => setSelectedTool('textBox')}
          >
            <span className='material-symbols-outlined'>rectangle</span>
            <span className='absolute inset-0 flex items-center justify-center text-xs font-medium'>
              T
            </span>
          </span>
          <span
            className='material-symbols-outlined p-1 rounded-md transition-colors duration-300 ease-in-out'
            style={{
              backgroundColor:
                selectedTool === 'delete' ? '#ad6bf1' : 'transparent'
            }}
            onClick={() => {
              setSelectedTool('delete')
              handleDeleteBox()
            }}
          >
            delete
          </span>
          {/* <span onClick={() => handleEditBorderColor('blue')}>
          Edit Border Color
        </span> */}
          <span>
            <div
              style={{
                backgroundColor: currentBackgroundColor || 'transparent',
                backgroundImage:
                  currentBackgroundColor != 'transparent'
                    ? 'none'
                    : 'repeating-linear-gradient(45deg, #ccc, #ccc 10px, #fff 10px, #fff 20px)'
              }}
              className='rounded-2xl h-5 w-5 '
              onClick={() => {
                setColorPickerVisible((prev) => !prev)
              }}
            ></div>
            {colorPickerVisible && (
              <SketchPicker
                className='absolute bottom-full mb-2'
                color={
                  selectedBoxIndex !== null &&
                  boxes[selectedBoxIndex] &&
                  boxes[selectedBoxIndex].backgroundColor
                    ? boxes[selectedBoxIndex].backgroundColor
                    : '#fff'
                }
                onChange={(color) => {
                  handleBackgroundColorChange(color)
                }}
              />
            )}
          </span>
          <span
            className='material-symbols-outlined cursor-pointer'
            title='Add Label'
          >
            label
          </span>
        </div>
      )}
      {boxes.map((box, index) => {
        if (box.type === 'textBox') {
          return (
            <input
              key={index}
              type='text'
              style={{
                position: 'absolute',
                left: box.x1,
                top: box.y,
                fontSize: '16px'
              }}
              value={box.text}
              onChange={(event) => {
                setBoxes((prevBoxes) =>
                  prevBoxes.map((box, i) =>
                    i === index ? { ...box, text: event.target.value } : box
                  )
                )
              }}
              autoFocus
            />
          )
        }
      })}
    </div>
  )
}

export default IssueDoc
