'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ChevronLeft,
  Check,
  CheckCheck,
  Clock,
  MessageCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Mock data for conversations
const conversations = [
  { id: '1', name: 'Maria Rodriguez', avatar: null, role: 'HHA Caregiver', lastMessage: 'Thank you for the opportunity! I am very interested in the position.', timestamp: '2 min ago', unread: 2, online: true },
  { id: '2', name: 'James Wilson', avatar: null, role: 'PCA Caregiver', lastMessage: 'When would be a good time for an interview?', timestamp: '15 min ago', unread: 1, online: true },
  { id: '3', name: 'Sarah Chen', avatar: null, role: 'CNA Caregiver', lastMessage: 'I have sent you my updated certifications.', timestamp: '1 hour ago', unread: 0, online: false },
  { id: '4', name: 'Michael Brown', avatar: null, role: 'HHA Caregiver', lastMessage: 'Yes, I am available to start next Monday.', timestamp: '3 hours ago', unread: 0, online: false },
  { id: '5', name: 'Emily Davis', avatar: null, role: 'PCA Caregiver', lastMessage: 'Could you please provide more details about the case?', timestamp: 'Yesterday', unread: 0, online: true },
  { id: '6', name: 'Robert Johnson', avatar: null, role: 'CNA Caregiver', lastMessage: 'I have 5 years of experience with Alzheimer patients.', timestamp: 'Yesterday', unread: 0, online: false },
]

const mockMessages = [
  { id: '1', senderId: 'them', text: 'Hello! I saw your job posting for a Home Health Aide position.', timestamp: '10:30 AM', status: 'read' },
  { id: '2', senderId: 'them', text: 'I have 3 years of experience and all required certifications.', timestamp: '10:31 AM', status: 'read' },
  { id: '3', senderId: 'me', text: 'Hi Maria! Thank you for reaching out. We are very interested in your profile.', timestamp: '10:45 AM', status: 'read' },
  { id: '4', senderId: 'me', text: 'Could you tell me more about your experience with elderly patients?', timestamp: '10:46 AM', status: 'read' },
  { id: '5', senderId: 'them', text: 'Of course! I have worked with elderly patients for the past 3 years. I specialize in mobility assistance, medication reminders, and companionship care.', timestamp: '11:00 AM', status: 'read' },
  { id: '6', senderId: 'them', text: 'I also have experience with dementia and Alzheimer patients.', timestamp: '11:01 AM', status: 'read' },
  { id: '7', senderId: 'me', text: 'That sounds great! We have a case that might be perfect for you.', timestamp: '11:15 AM', status: 'delivered' },
  { id: '8', senderId: 'them', text: 'Thank you for the opportunity! I am very interested in the position.', timestamp: '11:20 AM', status: 'read' },
]

export default function AgencyMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [showMobileChat, setShowMobileChat] = useState(false)

  const selectedChat = conversations.find(c => c.id === selectedConversation)

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('')
    }
  }

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id)
    setShowMobileChat(true)
  }

  return (
    <div className="flex-1 flex overflow-hidden -mt-0">
      {/* Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-card"
            />
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="py-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-card/60 transition-all text-left relative overflow-hidden ${
                  selectedConversation === conv.id ? 'bg-card shadow-[0_1px_3px_rgba(0,0,0,0.05)] z-10' : ''
                }`}
              >
                {/* Акцентная полоска слева для выбранного чата */}
                {selectedConversation === conv.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                )}
                
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatar || ''} alt={conv.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">{conv.name}</span>
                    <span className="text-[11px] text-muted-foreground shrink-0">{conv.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.role}</p>
                  {/* line-clamp-1 работает жестко от контейнера, игнорируя баги flex-box у truncate */}
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge variant="default" className="h-5 min-w-5 px-1.5 text-[10px] shrink-0">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-card ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setShowMobileChat(false)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={selectedChat.avatar || ''} alt={selectedChat.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selectedChat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{selectedChat.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'Online' : 'Offline'} · {selectedChat.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex"><Phone className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Call</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex"><Video className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Video Call</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-2xl mx-auto">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex items-end gap-2 ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                    
                    {/* Собеседник: Аватарка (слева) */}
                    {message.senderId === 'them' && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={selectedChat.avatar || ''} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {selectedChat.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.senderId === 'me'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[10px] ${message.senderId === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </span>
                        {message.senderId === 'me' && (
                          <span className="text-primary-foreground/70">
                            {message.status === 'read' ? <CheckCheck className="h-3 w-3" /> : message.status === 'delivered' ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end gap-2 max-w-2xl mx-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Paperclip className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }}
                  className="min-h-[40px] max-h-32 resize-none"
                  rows={1}
                />
                <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">No conversation selected</h3>
              <p className="text-sm text-muted-foreground">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
